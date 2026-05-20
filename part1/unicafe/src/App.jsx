import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return text === 'positive' ? (
    <table>
      <thead>
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      </thead>
    </table>
  ) : (
    <table>
      <thead>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </thead>
    </table>
  );
};

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
  if (total === 0) {
    return <p>no feedback given</p>;
  }
  return (
    <>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={total} />
      <StatisticsLine text='average' value={average} />
      <StatisticsLine text='positive' value={percentage * 100} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNetural] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    const updateGood = good + 1;
    setTotal(updateGood + neutral + bad);
    setAverage(average + 1);
  };

  const handleNeutral = () => {
    setNetural(neutral + 1);
    const updatedNeutral = neutral + 1;
    setTotal(good + updatedNeutral + bad);
    setAverage(average);
  };

  const handleBad = () => {
    setBad(bad + 1);
    const updatedBad = bad + 1;
    setTotal(good + neutral + updatedBad);
    setAverage(average - 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />

      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average / total}
        percentage={good / total}
      />
    </>
  );
};

export default App;
