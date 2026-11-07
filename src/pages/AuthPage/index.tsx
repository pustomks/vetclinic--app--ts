import { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import FormAuth from "../../components/FormAuth";
import FormRegister from "../../components/FormRegister";
import styles from "./AuthPage.module.css";

type AuthType = "auth" | "reg";

export default function AuthPage() {
  const [authType, setAuthType] = useState<AuthType>("auth");

  const onChange = (key: string) => {
    setAuthType(key as AuthType);
  };

  const items: TabsProps["items"] = [
    {
      key: "auth",
      label: "Authorise",
      children: <FormAuth />,
    },
    {
      key: "reg",
      label: "Register",
      children: <FormRegister onChange={onChange} />,
    },
  ];

  return (
    <div className={styles.containerAuth}>
      <Tabs
        activeKey={authType}
        onChange={onChange}
        centered
        items={items}
        destroyOnHidden={true}
      />
    </div>
  );
}
