import { authRouter } from "./Modules/index.js";
import connectDB from "./DB/connection.js";
import { SuccessResponse } from "./Utils/Response/success.response.js";
import { globalErrorHandler, NotFoundRequestException } from "./Utils/Response/error.response.js";

const bootstrap = async (app, express) => {
    app.use(express.json());
    await connectDB();
    app.use('/auth', authRouter);
    app.get('/', (req, res) => {
        SuccessResponse({ res, statusCode: 201, message: "hello from sara7a.bootstrap" })
    });
    app.all('/*dummy', (req, res) => {
        throw NotFoundRequestException({ message: "not found handler" })
    });
    app.use(globalErrorHandler);
};

export default bootstrap;