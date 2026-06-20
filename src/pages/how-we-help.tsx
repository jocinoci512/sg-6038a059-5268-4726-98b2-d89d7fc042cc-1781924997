
    import { GetServerSideProps } from "next";

    export const getServerSideProps: GetServerSideProps = async () => {
      return {
        redirect: {
          destination: "/how-we-help-individuals",
          permanent: true
        }
      };
    };

    export default function HowWeHelpRedirect() {
      return null;
    }
  