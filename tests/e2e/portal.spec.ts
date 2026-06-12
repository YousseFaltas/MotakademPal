import { expect, test } from "@playwright/test";

test("Arabic scout feed renders RTL by default", async ({ page }) => {
  await page.goto("/scout/feed");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "الفعاليات الجاية" })).toBeVisible();
  await expect(page.getByText("تدريب كشفي في فناء الكنيسة")).toBeVisible();
});

test("language switch changes to English", async ({ page }) => {
  await page.goto("/scout/feed");
  await page.getByRole("button", { name: "تغيير اللغة" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { name: "Upcoming Events" })).toBeVisible();
});

test("scout can confirm attendance", async ({ page }) => {
  await page.goto("/scout/feed");
  await page.getByRole("button", { name: "هحضر" }).first().click();
  await expect(page.getByText("تمام، سجلنا حضورك")).toBeVisible();
});

test("notebook saves Coptic spiritual habits", async ({ page }) => {
  await page.goto("/scout/notebook");
  await expect(page.getByText("صلاة الأجبية")).toBeVisible();
  await page.getByPlaceholder("اكتب تأمل صغير أو حاجة عايز تفتكرها من النهارده...").fill("تأمل قصير");
  await page.getByRole("button", { name: "احفظ المتابعة" }).click();
  await expect(page.getByText("المتابعة الروحية اتحفظت")).toBeVisible();
});

test("captain can open event studio and document review", async ({ page }) => {
  await page.goto("/captain/events");
  await expect(page.getByRole("heading", { name: "استوديو الفعاليات" })).toBeVisible();
  await page.goto("/captain/documents");
  await expect(page.getByRole("heading", { name: "مركز المراجعة" })).toBeVisible();
});

test("captain dashboard displays metrics and roster", async ({ page }) => {
  await page.goto("/captain/dashboard");
  await expect(page.getByRole("heading", { name: "مركز القيادة" })).toBeVisible();
  await expect(page.getByText("إجمالي الكشافة")).toBeVisible();
  await expect(page.getByText("تأكيدات الحضور")).toBeVisible();
  await expect(page.getByText("انتظام المتابعة الروحية")).toBeVisible();
  await expect(page.getByRole("heading", { name: "كشف الأفراد" })).toBeVisible();
  await expect(page.getByText("كيرلس سامي")).toBeVisible();
});

test("captain roster page renders with search", async ({ page }) => {
  await page.goto("/captain/roster");
  await expect(page.getByRole("heading", { name: "كشف الأفراد" })).toBeVisible();
  await expect(page.getByPlaceholder("دوّر على كشاف...")).toBeVisible();
  await expect(page.getByText("كيرلس سامي")).toBeVisible();
  await expect(page.getByText("بيشوي عادل")).toBeVisible();
  await expect(page.getByText("مارك يوحنا")).toBeVisible();
});

test("captain can approve a document", async ({ page }) => {
  await page.goto("/captain/documents");
  await page.getByRole("button", { name: "موافقة" }).first().click();
  await expect(page.getByText("تم تحديث حالة الورق")).toBeVisible();
});

test("calendar page displays month grid and week list", async ({ page }) => {
  await page.goto("/scout/calendar");
  await expect(page.getByRole("heading", { name: "التقويم" })).toBeVisible();
  await expect(page.getByText("يونيو ٢٠٢٦")).toBeVisible();
  await expect(page.getByRole("heading", { name: "قائمة الأسبوع" })).toBeVisible();
});

test("profile page displays scout info and document status", async ({ page }) => {
  await page.goto("/scout/profile");
  await expect(page.getByRole("heading", { name: "كيرلس سامي" })).toBeVisible();
  await expect(page.getByText("رقم ولي الأمر")).toBeVisible();
  await expect(page.getByRole("heading", { name: "حالة الأوراق" })).toBeVisible();
  await expect(page.getByText("موافقة ولي الأمر")).toBeVisible();
  await expect(page.getByText("استمارة صحية")).toBeVisible();
  await expect(page.getByText("شهادة معمودية")).toBeVisible();
});

test("theme toggle switches dark mode class", async ({ page }) => {
  await page.goto("/scout/feed");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "الشكل" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.getByRole("button", { name: "الشكل" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("event studio draft form accepts input", async ({ page }) => {
  await page.goto("/captain/events");
  const titleInput = page.getByPlaceholder("مثلا: تدريب كشفي في فناء الكنيسة");
  await titleInput.fill("تدريب الجمعة");
  await expect(titleInput).toHaveValue("تدريب الجمعة");
  const locationInput = page.getByPlaceholder("فناء الكنيسة");
  await locationInput.fill("مبنى الخدمة");
  await expect(locationInput).toHaveValue("مبنى الخدمة");
});
