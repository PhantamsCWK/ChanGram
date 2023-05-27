import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { body } from "express-validator";

dotenv.config();

const state = {
    token: "",
    user: { username: "test", password: "1234567890", email: "testTest@gmail.com" },
    post: null,
    filePath: __dirname + "/aurora-borealis-moon-night-ce-3840x2400.jpg"
};

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.disconnect();
});

test('should 404', async () => { 
    const res = await request(app).get("/usersdwadawdad")

    expect(res.status).toEqual(404); 
});

describe("API end point", () => {
    

    describe("POST auth/register", () => {
        it("it will error", async () => {
            const res = await request(app).post("/auth/register").send({ ...state.user, email: "test@upinipin@gmail.com" });
        
            expect(res.status).toBe(400);
        });

        it("it must success", async () => {
            const res = await request(app).post("/auth/register").send({ ...state.user });

            expect(res.status).toBe(201);
        });
    });

    describe("POST auth/login", () => {
        it("it will error", async () => {
            const res = await request(app).post("/auth/login").send({ email: state.user.email, password: "12345678" });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message","User or Password wrong");
        });

        it("it will success", async () => {
            const res = await request(app).post("/auth/login").send({ email: state.user.email, password: state.user.password });
            
            const cookies = res.get("Set-Cookie");

            expect(res.status).toBe(202);
            expect(res.body).toHaveProperty("accessToken");
            expect(cookies).toBeDefined();

            state.cookies = cookies;

            state.token = res.body.accessToken;
        });
    });

    describe("GET posts", () => {
        it("it will success", async () => {
            const res = await request(app).get("/posts").set("authorization", `Bearer ${state.token}`);

            expect(res.status).toBe(200);
        });
    });

    describe("POST posts", () => {
        it("it will success", async () => {
            const res = await request(app).post("/posts")
            .set("Content-Type", "multipart/form-data")
            .field("description", "Urna hendrerit quam dictum ac lorem. Cras magnis ante praesent eu nam. Malesuada sem habitant nibh facilisi pellentesque proin nam condimentum posuere dictum diam. Suscipit ac pulvinar bibendum ut quis vehicula nostra quisque tempor accumsan.")
            .attach("picture", state.filePath)
            .set("authorization", `Bearer ${state.token}`);

            expect(res.status).toBe(201);
            expect(res.body.post).toHaveProperty("_id");
            
            state.post = res.body.post;
            
        });
    });

    describe("GET posts/:id", () => {
        it("it will success", async () => {
            const res = await request(app).get(`/posts/${state.post._id}`)
            .set("authorization", `Bearer ${state.token}`);

            expect(res.status).toBe(200);
            expect(res.body.post._id).toEqual(state.post._id);
            expect(res.body.post).toHaveProperty("author")
        });
    });

    describe("GET posts/:author/user", () => {
        it("it will success", async () => {
            const res = await request(app).get(`/posts/${state.user.username}/user`)
            .set("authorization", `Bearer ${state.token}`);
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("posts");
        });

    });
    
    describe("PATCH posts/:id/like", () => {
        it("it will like", async () => {
            const res = await request(app).patch(`/posts/${state.post._id}/like`)
            .set("authorization", `Bearer ${state.token}`);

            expect(res.status).toBe(200);
            state.post = res.body.post;
        });
    });
    
    describe("DELETE posts/:id", () => {
        it("it will success", async () => {
            const res = await request(app).delete(`/posts/${state.post._id}`)
            .set("authorization", `Bearer ${state.token}`);
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("author");
            expect(res.body._id).toEqual(state.post._id);
        });
    });

    describe("GET auth/refresh", () => {
        it("it will success", async () => {
            const res = await request(app).get("/auth/refresh")
            .set("Cookie", state.cookies);

            expect(res.status).toBe(200);

            state.token = res.body.accessToken;
        });
    });

    describe("GET user/:unique", () => {
        it("it will success", async () => {
            const res = await request(app).get(`/user/${state.user.username}`)
            .set("authorization", `Bearer ${state.token}`)
            .set("Cookie", state.cookies);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("user");
            expect(res.body.user.username).toEqual(state.user.username);
        });
    });

    describe("PATCH user/:unique", () => {
        it("it will success", async () => {
            const res = await request(app).patch("/user/admin")
            .set("authorization", `Bearer ${state.token}`)
            .set("Cookie", state.cookies);

            expect(res.status).toBe(202);
            expect(res.body).toHaveProperty("follower");
            expect(res.body).toHaveProperty("following");
        });
    });

    describe("GET user/:unique/following", () => {
        it("it will success", async () => {
            const res = await request(app).get(`/user/${state.user.username}/following`)
            .set("authorization", `Bearer ${state.token}`)
            .set("Cookie", state.cookies);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("following");
        });
    });

    describe("GET user/:unique/follower", () => {
        it("it will success", async () => {
            const res = await request(app).get(`/user/${state.user.username}/follower`)
            .set("authorization", `Bearer ${state.token}`)
            .set("Cookie", state.cookies);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("follower");
        });
    });

    describe("DELETE user/:unique", () => {
        it("it will success", async () => {
            const res = await request(app).delete(`/user/${state.user.username}`)
            .set("Cookie", state.cookies)
            .set("authorization", `Bearer ${state.token}`);

            expect(res.status).toBe(200);
        });
    });

    describe("GET auth/logout", () => {
        it("it will success", async () => {
            const res = await request(app).get("/auth/logout")
            .set("Cookie", state.cookies);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message", "Cookie cleared");

        });
    });


});