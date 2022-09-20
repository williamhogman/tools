import Page from "../components/Page.tsx";
import JsonPrettyPrint from "../islands/JsonPrettyPrint.tsx";

export default function JsonPrettyPrintPage() {
  return (
    <Page
      heading="Json Pretty Print"
      description="This pretty prints your JSON"
    >
      <JsonPrettyPrint />
    </Page>
  );
}
