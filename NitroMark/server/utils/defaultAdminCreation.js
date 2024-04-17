const User = require("../models/userModel");

const defaultAdminTemplate = new User({
   firstname: 'Nguyen',
   lastname: 'Admin',
   email: 'e.commerce.app.04.01@gmail.com',
   mobile: '0999999999',
   password: 'admin',
   role: 'admin',
   address: '26 Street 34, Linh Dong, Thu Duc, Viet Nam',
});

async function createAdminIfNotExists() {
   try {
      const isDefaultAdminExisting = await User.exists({
         email: defaultAdminTemplate.email, role: defaultAdminTemplate.role
      });

      if (!isDefaultAdminExisting) {
         await defaultAdminTemplate.save();
         console.log(`Admin user with default email: ${defaultAdminTemplate.email} created successfully.`);
      } else {
         console.log(`Existing admin user with default email: ${defaultAdminTemplate.email}`);
      }
   } catch (error) {
      console.error('Error creating admin user:', error);
   }
}

module.exports = createAdminIfNotExists;
