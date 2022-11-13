import React from "react";
import ListView from "../components/admin/listView";
import { Container} from "reactstrap";

export default function ViewAll() {
  return (
    <div>
      <Container>
        <ListView />
      </Container>
    </div>
  );
}
