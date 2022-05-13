import { Button } from "antd";
import Link from "next/link";
import { memo } from "react";
import { useState } from "react";
const TestLayout = ({ children }) => {
  console.log("render layout");
  const [count, setCount] = useState(0);
  return (
    <div>
      index 测试公共部分 count: {count}
      <Button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        +
      </Button>
      <hr />
      <Link href="/workbench/home">
        <a>go home</a>
      </Link>
      <hr />
      <Link href="/workbench/order">
        <a>go order</a>
      </Link>
      <hr />
      <Link href="/workbench/equipment">
        <a>go equipment</a>
      </Link>
      {children}
    </div>
  );
};

export default TestLayout;