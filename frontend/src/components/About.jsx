import React from "react";

function About() {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">About iNotebook</h1>
              
              <div className="mb-4">
                <h4>What is iNotebook?</h4>
                <p>
                  iNotebook is a secure cloud-based note-taking application that allows you to create, 
                  store, edit, and access your notes from anywhere. Built with the MERN stack 
                  (MongoDB, Express, React, Node.js), it provides a seamless and responsive user experience.
                </p>
              </div>
              
              <div className="mb-4">
                <h4>Features</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">✅ Secure user authentication</li>
                  <li className="list-group-item">✅ Create, read, update, and delete notes</li>
                  <li className="list-group-item">✅ Organize notes with tags</li>
                  <li className="list-group-item">✅ Responsive design for all devices</li>
                  <li className="list-group-item">✅ Fast and intuitive user interface</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4>Technology Stack</h4>
                <div className="row text-center">
                  <div className="col-3">
                    <div className="p-3">
                      <h5>MongoDB</h5>
                      <p className="text-muted">Database</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="p-3">
                      <h5>Express</h5>
                      <p className="text-muted">Backend</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="p-3">
                      <h5>React</h5>
                      <p className="text-muted">Frontend</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="p-3">
                      <h5>Node.js</h5>
                      <p className="text-muted">Runtime</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-muted">
                  Created by Suraj Sonawane &copy; {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;