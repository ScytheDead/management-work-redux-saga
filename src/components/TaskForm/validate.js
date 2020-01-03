const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Vui lòng nhập tên công việc';
  } else if (values.title.length < 5) {
    errors.title = 'Tên công việc phải lớn hơn 5 ký tự';
  }
  return errors;
};

export default validate;
