const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = (props) => {
  console.log('CONTENT PROPS', props);
  return props.name.map((x) => <Part key={x.id} name={x.name} exercises={x.exercises} />);
};

const Total = (props) => {
  const initialValue = 0;
  const exercises = props.parts.map((x) => x.exercises);
  const sum = exercises.reduce((acc, curr) => acc + curr, initialValue);
  return <b>total of {sum} exercises</b>;
};

const Course = ({ course }) => {
  console.log('course', course);
  return (
    <>
      <Header name={course.name} />
      <Content name={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course) => <Course key={course.id} course={course} />);
};

export default App;
