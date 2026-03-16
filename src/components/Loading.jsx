import { Loader } from "lucide-react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <Loader className="spin" size={24} />
    </div>
  );
}
