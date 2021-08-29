import ContentWithLabel from "components/ContentWithLabel";

interface Props {}

export default function HomematesNeedsPage({}: Props): JSX.Element {
  const NEEDS = [
    {
      name: "Żelazko",
      house_id: "12331413",
      user: {
        name: "Ada",
        id: "123234",
      },
      created_at: "12-12-2020",
    },
  ];

  return (
    <div className="contentContainer">
      <ContentWithLabel title="Homemates needs">Hello</ContentWithLabel>
    </div>
  );
}
