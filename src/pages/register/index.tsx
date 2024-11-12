import { useState } from "react";
import { Link } from "react-router-dom";
import { PanelToggle } from "../../components/panel-toggle";
import { SignUpForm } from "../../components/signup-form";
import { SSOPanel } from "../../components/sso-panel";

export const Register = () => {
  const [activeTab, setActiveTab] = useState("email-tab");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="auth-card">
      <div className="card">
        <div className="card-header text-center py-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
            <i className="fas fa-chart-line fa-lg text-primary"></i>
            <span className="h4 mb-0">
              <span className="fw-light">Trade</span>
              <span className="fw-bold">Control</span>
            </span>
          </div>
          <h2 className="card-title mb-1">Welcome back</h2>
          <p className="text-muted">Choose your preferred login method</p>
        </div>
        <div className="card-body">
          <PanelToggle activeTab={activeTab} handleTabChange={handleTabChange} />

          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === "email-tab" ? "show active" : ""}`} id="email-tab">
              <SignUpForm />
            </div>
            <div className={`tab-pane fade ${activeTab === "sso-tab" ? "show active" : ""}`} id="sso-tab">
              <SSOPanel />
            </div>
          </div>
        </div>
        <div className="card-footer text-center py-3">
          <p className="mb-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary text-decoration-none">
              Sign up
            </Link>
          </p>
          <div className="mb-3">
            <a href="/forgot-password" className="text-primary text-decoration-none">
              Forgot password?
            </a>
          </div>
          <p className="text-muted small mb-0">
            By continuing, you agree to our{" "}
            <a href="#" className="text-decoration-none">
              Terms of Service{" "}
            </a>
            and{" "}
            <a href="#" className="text-decoration-none">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
