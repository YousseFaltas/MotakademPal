-- ============================================
-- Motakadem Coptic Scouts — Database Functions
-- Run AFTER 03_rls_policies.sql
-- ============================================

-- Helper: get current user role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT role FROM public.profiles WHERE id = auth.uid(); $$;

-- ─────────────────────────────────────────────
-- Notebook streak for a scout
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_notebook_streak(p_scout_id UUID)
RETURNS JSONB
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_current INTEGER := 0;
  v_target INTEGER := 30;
  v_month INTEGER[];
  v_day DATE;
  v_today DATE := CURRENT_DATE;
  v_month_start DATE := date_trunc('month', v_today)::DATE;
  v_check DATE := v_today;
  v_found BOOLEAN;
  v_cnt INTEGER;
BEGIN
  -- Current streak
  LOOP
    SELECT EXISTS(
      SELECT 1 FROM notebook_entries
      WHERE scout_id = p_scout_id AND date = v_check
        AND array_length(completed_habits, 1) > 0
    ) INTO v_found;
    EXIT WHEN NOT v_found;
    v_current := v_current + 1;
    v_check := v_check - 1;
  END LOOP;

  -- Month array
  v_month := '{}';
  v_day := v_month_start;
  WHILE v_day <= v_today LOOP
    SELECT COALESCE(LEAST(array_length(completed_habits, 1), 4), 0) INTO v_cnt
    FROM notebook_entries WHERE scout_id = p_scout_id AND date = v_day;
    IF NOT FOUND THEN v_cnt := 0; END IF;
    v_month := array_append(v_month, v_cnt);
    v_day := v_day + 1;
  END LOOP;

  RETURN jsonb_build_object('current', v_current, 'target', v_target, 'month', to_jsonb(v_month));
END;
$$;

-- ─────────────────────────────────────────────
-- Dashboard summary (captain only, aggregate)
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_dashboard_summary()
RETURNS JSONB
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_total INTEGER;
  v_new INTEGER;
  v_rsvp_pct INTEGER;
  v_next RECORD;
  v_consistency INTEGER;
  v_activity JSONB;
BEGIN
  IF public.get_my_role() != 'captain' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT count(*) INTO v_total FROM profiles WHERE role = 'scout';
  SELECT count(*) INTO v_new FROM profiles
    WHERE role = 'scout' AND created_at >= date_trunc('month', now());

  SELECT id, title_ar, title_en INTO v_next FROM events
    WHERE status = 'published' AND date >= now() ORDER BY date LIMIT 1;

  IF v_next IS NOT NULL THEN
    SELECT COALESCE(ROUND(count(*) FILTER (WHERE status = 'going')::NUMERIC
      / NULLIF(v_total, 0) * 100), 0)::INT INTO v_rsvp_pct
    FROM rsvps WHERE event_id = v_next.id;
  ELSE v_rsvp_pct := 0; END IF;

  SELECT COALESCE(ROUND(AVG(COALESCE(array_length(completed_habits, 1), 0))::NUMERIC
    / 8 * 100), 0)::INT INTO v_consistency
  FROM notebook_entries WHERE date >= date_trunc('month', CURRENT_DATE)::DATE;

  SELECT COALESCE(jsonb_agg(a), '[]') INTO v_activity FROM (
    SELECT jsonb_build_object(
      'ar-EG', p.display_name_ar || ' أكد حضوره ل' || e.title_ar,
      'en', p.display_name_en || ' confirmed for ' || e.title_en
    ) a FROM rsvps r JOIN profiles p ON p.id = r.scout_id
    JOIN events e ON e.id = r.event_id
    WHERE r.status = 'going' ORDER BY r.updated_at DESC LIMIT 5
  ) sub;

  RETURN jsonb_build_object(
    'totalYouth', v_total, 'newThisMonth', v_new,
    'upcomingRsvpPercent', v_rsvp_pct,
    'nextEventName', CASE WHEN v_next IS NOT NULL
      THEN jsonb_build_object('ar-EG', v_next.title_ar, 'en', v_next.title_en)
      ELSE jsonb_build_object('ar-EG', '', 'en', '') END,
    'notebookConsistency', v_consistency,
    'recentActivity', v_activity
  );
END;
$$;

-- ─────────────────────────────────────────────
-- Upsert notebook entry
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.upsert_notebook_entry(
  p_date DATE, p_completed_habits TEXT[], p_reflection TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_entry notebook_entries;
BEGIN
  INSERT INTO notebook_entries (scout_id, date, completed_habits, reflection)
  VALUES (auth.uid(), p_date, p_completed_habits, p_reflection)
  ON CONFLICT (scout_id, date) DO UPDATE SET
    completed_habits = EXCLUDED.completed_habits,
    reflection = EXCLUDED.reflection, updated_at = now()
  RETURNING * INTO v_entry;
  RETURN to_jsonb(v_entry);
END;
$$;

-- ─────────────────────────────────────────────
-- Upsert RSVP
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.upsert_rsvp(
  p_event_id UUID, p_status public.rsvp_status
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_rsvp rsvps;
BEGIN
  INSERT INTO rsvps (event_id, scout_id, status)
  VALUES (p_event_id, auth.uid(), p_status)
  ON CONFLICT (event_id, scout_id) DO UPDATE SET
    status = EXCLUDED.status, updated_at = now()
  RETURNING * INTO v_rsvp;
  RETURN to_jsonb(v_rsvp);
END;
$$;
