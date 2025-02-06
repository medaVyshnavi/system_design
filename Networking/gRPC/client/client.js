// GRPC client

const PROTO_PATH = "./customers.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the .proto file.
// options to control the conversion
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Create the gRPC package and converts it into a JavaScript object that gRPC can use.
const proto =
  grpc.loadPackageDefinition(packageDefinition);

const client = new proto.CustomersService(
  "127.0.0.1:30043",
  grpc.credentials.createInsecure()
);

module.exports = client