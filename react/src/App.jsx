import { Form } from "./Components/Form.jsx";
import { Title } from "./components/Title.jsx";

export function App() {
  return (
    <div className="flex gap-10 flex-col justify-center items-center h-screen w-screen">
      <Title></Title>
      <Form></Form>
    </div>
  );
}
