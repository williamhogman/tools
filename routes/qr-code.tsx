import Page from "../components/Page.tsx";
import QRCode from "../islands/QRCode.tsx";

export default function JsonPrettyPrintPage() {
  return (
    <Page heading="QRCode Generator" description="Generates QRCodes">
      <QRCode />
    </Page>
  );
}
