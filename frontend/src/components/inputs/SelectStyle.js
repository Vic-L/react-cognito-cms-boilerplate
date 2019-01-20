// TODO this is a non component, should it be placed here? hmm
const SelectStyle = {
  option: (base, state) => ({
    ...base,
    borderBottom: '1px black solid',
    color: 'black',
  }),
  container: () => ({
    position: 'absolute',
    top: 0,
    width: '100%',
  }),
  // 50 is the height of input
  control: () => ({
    opacity: 0,
    width: '100%',
    overflow: 'hidden',
    height: 50,
    cursor: 'pointer',
  })
}

export default SelectStyle