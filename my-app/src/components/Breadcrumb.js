import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Ẩn Breadcrumb nếu đang ở trang chủ
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Trang chủ</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li className="breadcrumb-item active" key={name} aria-current="page">
              {decodeURIComponent(name)}
            </li>
          ) : (
            <li className="breadcrumb-item" key={name}>
              <Link to={routeTo}>{decodeURIComponent(name)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;