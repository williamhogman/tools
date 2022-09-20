export default function Instruction({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div class="mb-4">
      <h2 class="text-xl">{heading}</h2>
      <p class="text-lg">{description}</p>
    </div>
  );
}
