import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AdminLoginPage from "@/app/admin/login/page";
import AdminDashboardPage from "@/app/admin/page";
import EditProductPage from "@/app/admin/products/[id]/edit/page";
import { AdminAuthProvider, AdminRouteGuard, useAdminAuth } from "@/lib/store/auth";
import { cmsStore } from "@/lib/store/cmsStore";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/admin",
  useSearchParams: () => new URLSearchParams(),
}));

// Test component to exercise useAdminAuth hook directly
function TestAuthComponent() {
  const { user, isAuthenticated, login, logout } = useAdminAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "AUTHENTICATED" : "UNAUTHENTICATED"}
      </div>
      <div data-testid="user-email">{user?.email || "NO_USER"}</div>
      <button onClick={() => login("admin@cynshub.com", "admin123456")}>
        Log In Valid
      </button>
      <button onClick={() => login("wrong@email.com", "badpassword")}>
        Log In Invalid
      </button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

describe("Admin JWT Authentication & Store", () => {
  beforeEach(() => {
    localStorage.clear();
    cmsStore.resetToDefaults();
  });

  it("authenticates with valid credentials and manages JWT state", async () => {
    const user = userEvent.setup();

    render(
      <AdminAuthProvider>
        <TestAuthComponent />
      </AdminAuthProvider>,
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "UNAUTHENTICATED",
    );

    // Attempt login with valid credentials
    await user.click(screen.getByText("Log In Valid"));

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "AUTHENTICATED",
    );
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "admin@cynshub.com",
    );

    // Log out
    await user.click(screen.getByText("Log Out"));
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "UNAUTHENTICATED",
    );
  });

  it("rejects invalid login credentials", async () => {
    const user = userEvent.setup();

    render(
      <AdminAuthProvider>
        <TestAuthComponent />
      </AdminAuthProvider>,
    );

    await user.click(screen.getByText("Log In Invalid"));
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "UNAUTHENTICATED",
    );
  });
});

describe("Admin CMS Reactive Store", () => {
  beforeEach(() => {
    cmsStore.resetToDefaults();
  });

  it("updates announcement bar and persists changes", () => {
    expect(cmsStore.getSnapshot().sections.announcement.text).toContain(
      "Pre-orders open",
    );

    act(() => {
      cmsStore.updateAnnouncement({ text: "Black Friday Drop is Now Live!" });
    });

    expect(cmsStore.getSnapshot().sections.announcement.text).toBe(
      "Black Friday Drop is Now Live!",
    );
  });

  it("adds and updates products in catalog", () => {
    const initialCount = cmsStore.getSnapshot().products.length;

    act(() => {
      cmsStore.addProduct({
        id: "test-new-prod",
        name: "Test Velvet Jumpsuit",
        slug: "test-velvet-jumpsuit",
        category: "sets",
        price: 890,
        description: "Test description",
        images: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        ],
        availableSizes: ["S", "M"],
        availableColors: [{ name: "Black", hex: "#000" }],
        isPreOrder: false,
        rating: 5,
        reviewCount: 1,
        tags: ["New Arrival"],
        variants: [],
        details: { fit: "True", fabric: "Velvet", care: "Dry clean" },
      });
    });

    expect(cmsStore.getSnapshot().products.length).toBe(initialCount + 1);
    expect(cmsStore.getSnapshot().products[0].name).toBe(
      "Test Velvet Jumpsuit",
    );
  });

  it("updates order fulfillment status", () => {
    const order = cmsStore.getSnapshot().orders[0];
    expect(order).toBeDefined();

    act(() => {
      cmsStore.updateOrderStatus(order.id, "out_for_delivery");
    });

    const updated = cmsStore
      .getSnapshot()
      .orders.find((o) => o.id === order.id);
    expect(updated?.fulfillmentStatus).toBe("out_for_delivery");
  });
});

describe("Admin Login & Dashboard Pages", () => {
  it("renders Admin Login Page with inputs and branding", () => {
    render(
      <AdminAuthProvider>
        <AdminLoginPage />
      </AdminAuthProvider>,
    );

    expect(screen.getByLabelText(/owner email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("renders Admin Dashboard with KPIs, purchase funnel, and pre-order sourcing demand", () => {
    render(
      <AdminAuthProvider>
        <AdminDashboardPage />
      </AdminAuthProvider>,
    );

    // Headline and KPIs
    expect(
      screen.getByRole("heading", { name: /store performance & operations/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/revenue collected/i)).toBeInTheDocument();
    expect(screen.getByText(/pending fulfillment/i)).toBeInTheDocument();
    expect(screen.getByText(/active pre-orders/i)).toBeInTheDocument();

    // 5-Stage Purchase Funnel
    expect(screen.getByText(/1\. store visits/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. pdp views/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. added to bag/i)).toBeInTheDocument();
    expect(screen.getByText(/4\. checkout initiated/i)).toBeInTheDocument();
    expect(screen.getByText(/5\. completed/i)).toBeInTheDocument();
  });

  it("protects admin routes and redirects unauthenticated users", () => {
    render(
      <AdminAuthProvider>
        <AdminRouteGuard>
          <div data-testid="protected-content">Secret Admin Area</div>
        </AdminRouteGuard>
      </AdminAuthProvider>,
    );

    // Unauthenticated user should not see protected content
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  it("renders EditProductPage for existing product with Suspense boundary", async () => {
    const page = await EditProductPage({ params: Promise.resolve({ id: "prod-3" }) });
    render(
      <AdminAuthProvider>
        {page}
      </AdminAuthProvider>,
    );

    // Should resolve to Solene Blazer form
    expect(screen.getByDisplayValue("Solene Blazer")).toBeInTheDocument();
  });

  it("renders not found state when editing non-existent product", async () => {
    const page = await EditProductPage({ params: Promise.resolve({ id: "prod-unknown-999" }) });
    render(
      <AdminAuthProvider>
        {page}
      </AdminAuthProvider>,
    );

    expect(screen.getByText("Silhouette Not Found")).toBeInTheDocument();
    expect(screen.getByText(/return to catalog/i)).toBeInTheDocument();
  });
});
