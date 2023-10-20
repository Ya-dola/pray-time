import classNames from "classnames";
import Head from "next/head";
import styles from "./Layout.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// const metadata = { title: "Page Title", description: "Page Description" };

const Layout = ({ children, metadata }) => {
  const bodyClasses = classNames(inter.className, styles.container);

  return (
    <div className={bodyClasses}>
      {metadata && (
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
      )}
      {children}
    </div>
  );
};

export default Layout;
