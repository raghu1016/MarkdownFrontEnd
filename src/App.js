import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Grid } from "@mui/material";
import "./styles.css";
import { TextareaAutosize } from "./components/CustomTextArea";

const App = () => {
  const [markdown, setMarkdown] = useState("");

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("preview").innerHTML = data;
      })
      .catch((error) => console.error("Error:", error));
  }, [markdown]);

  return (
    <Container>
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mt: 8 }}
      >
        <Paper elevation={3} className="paper">
          <Typography variant="h5" gutterBottom>
            Markdown Editor
          </Typography>
          <TextareaAutosize
            id="editor"
            value={markdown}
            onChange={handleInputChange}
            placeholder="Type your Markdown here..."
            className="textarea"
          />
        </Paper>
        <Paper elevation={3} className="paper">
          <Typography variant="h5" gutterBottom>
            Live Preview
          </Typography>
          <div id="preview" className="preview-pane"></div>
        </Paper>
      </Grid>
    </Container>
  );
};

export default App;
