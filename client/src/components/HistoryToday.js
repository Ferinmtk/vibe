import React from "react";

export default function HistoryToday({ history }) {
  if (!history || history.error) return <p>History data not available.</p>;

  return (
    <div className="history">
      <h2>📅 Today in History – {history.date}</h2>

      <section>
        <h3>Events</h3>
        <ul>
          {history.events.map((e, i) => (
            <li key={i}>
              <strong>{e.year}</strong>: {e.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Famous Births</h3>
        <ul>
          {history.births.map((b, i) => (
            <li key={i}>
              <strong>{b.year}</strong>: {b.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Deaths</h3>
        <ul>
          {history.deaths.map((d, i) => (
            <li key={i}>
              <strong>{d.year}</strong>: {d.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
