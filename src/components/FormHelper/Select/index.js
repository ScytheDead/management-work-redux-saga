// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   FormHelperText,
//   MenuItem,
// } from '@material-ui/core';

// const renderFromHelper = ({ touched, error }) => {
//   if (!(touched && error)) {
//     return null;
//   }
//   return <FormHelperText>{touched && error}</FormHelperText>;
// };

// const renderSelectField = ({
//   input,
//   label,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <FormControl error={touched && error}>
//     <InputLabel htmlFor="age-native-simple">Age</InputLabel>
//     <Select
//       native
//       {...input}
//       {...custom}
//       inputProps={{ name: 'age', id: 'age-native-simple' }}
//     >
//       {children}
//     </Select>
//     {renderFromHelper({ touched, error })}
//   </FormControl>
// );

// renderSelectField.propTypes = {
//   label: PropTypes.string,
//   input: PropTypes.object,
//   meta: PropTypes.object,
//   children: PropTypes.object,
// };

// export default renderSelectField;
