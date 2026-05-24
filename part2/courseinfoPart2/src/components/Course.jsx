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

export default Course;
