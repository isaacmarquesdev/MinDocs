import { Header } from "../../components/Header/Header.jsx"; 
import { Sidebar } from "../../components/Sidebar/Sidebar.jsx"
import { MyDocuments } from "../../components/MyDocuments/MyDocuments.jsx";
import { Folders } from "../Folders/Folders.jsx";
import { Scheduled } from "../Scheduled/Scheduled.jsx";

export function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <MyDocuments />
    </>
  );
}
