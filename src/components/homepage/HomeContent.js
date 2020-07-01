import React from "react";

export default function HomeContent() {
  return (
    <section className="container">
      <div className="columns features">
        <div className="column is-4">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Track Your Events</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Create New Events</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Update Or Delete Events</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
