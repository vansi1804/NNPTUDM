const request = require("supertest");
const app = require("../server/index.js");
const User = require("../server/models/userModel.js");
const jwt = require("jsonwebtoken");

//Nguyen Duy Nien
describe("loginUserCtrl", () => {
    let server, user;

    beforeAll(async () => {
        // tạo một tài khoản người dùng để kiểm tra đăng nhập
        user = await User.create({
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            mobile: "123456789",
            password: "password123",
        });
        server = app.listen();
    });

    afterAll(async () => {
        // xóa tài khoản người dùng sau khi kiểm tra xong
        await User.findByIdAndDelete(user._id);
        server.close();
    });

    it("should return user info and refreshToken when login successfully", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({
                email: "john.doe@example.com",
                password: "password123",
            })
            .expect(200);

        expect(response.body).toHaveProperty("_id", user._id.toString());
        expect(response.body).toHaveProperty("firstname", user.firstname);
        expect(response.body).toHaveProperty("lastname", user.lastname);
        expect(response.body).toHaveProperty("email", user.email);
        expect(response.body).toHaveProperty("token", response.body.token);
    });

    it("should return error when login with invalid email or password", async () => {
        await request(app)
            .post("/api/user/login")
            .send({
                email: "invalid.email@example.com",
                password: "invalidpassword",
            })
            .expect(400, {
                message: "Invalid email or password",
            });
    });
});

//Tran Van Tien Phat
describe("updateUser", () => {
    let user;
    let token;

    beforeAll(async () => {
        // tạo một tài khoản người dùng để kiểm tra cập nhật thông tin
        user = await User.create({
            firstname: "John",
            lastname: "Doe",
            email: "john2.doe@example.com",
            mobile: "123456780",
            password: "password123",
        });
        token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    });

    afterAll(async () => {
        // xóa tài khoản người dùng sau khi kiểm tra xong
        await User.findByIdAndDelete(user._id);
    });

    it("should update user info and return the updated user", async () => {
        const response = await request(app)
            .put(`/api/user/edit-user/${user._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstname: "Jane",
                mobile: "0900000003"
            })
            .expect(200);

        expect(response.body).toHaveProperty("_id", user._id.toString());
        expect(response.body).toHaveProperty("firstname", "Jane");
        expect(response.body).toHaveProperty("lastname", "Doe");
        expect(response.body).toHaveProperty("email", "john2.doe@example.com");
    }, 10000);

    it("should return error when trying to update user with invalid id", async () => {
        await request(app)
            .put("/api/user/edit-user/invalid-id")
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstname: "Jane",
            })
            .expect((res) => {
                expect(res.body.message).toEqual('Invalid user id');
            });
    }, 10000);
});
