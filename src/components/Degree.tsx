const toFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9/5) + 32;
};

const Degree = ({ temp, deg }: { temp: number, deg: boolean }): JSX.Element => (
  <>
    <span>
      {deg ? temp : toFahrenheit(temp)}
      <sup>°</sup>
      {deg ? 'C' : 'F'}
    </span>
  </>
)

export default Degree
