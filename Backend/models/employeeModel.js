import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  course: [{ type: String, enum: ['MCA', 'BCA', 'BSC'], required: true }],
  image: { type: String, required: true },
  createdDate: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
