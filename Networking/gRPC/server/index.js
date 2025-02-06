// GRPC SERVER

const PROTO_PATH = "./customers.proto"

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

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
const userPackage = grpc.loadPackageDefinition(packageDefinition);

// create a grpc server instance
const server = new grpc.Server()

const customers = [
  {
    id: "dsfkjsdf",
    name: "vyshnavi",
    location: "bangalore",
  },
  {
    id: "erwewr",
    name: "meda",
    location: "japan",
  },
];

//Add the Service to the gRPC Server
// call is similar to this in js and callback is the response we want to send back to our client
server.addService(userPackage.CustomersService.service, {
  getUsers: (call, callback) => {
    // basically db calls fetch the data
    // error-first callbacks, null arg refers to errors , 2nd arg is the actual data
    callback(null, { customer: customers });
  },
  get: (call, callback) => {
    const customer = customers.find(
      (customer) => customer.id === call.request.id
    );
    if (customer) {
      callback(null, { customer });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "not FOUND",
      });
    }
  },
  insert: (call, callback) => {
    const newCustomer = call.request;
    newCustomer.id = "3";
    customers.push(newCustomer);
    callback(null, newCustomer);
  },
  update: (call, callback) => {
    const existingUser = customers.find(
      (customer) => customer.id === call.request.id
    );
    if (existingUser) {
      existingUser.id = call.request.id;
      existingUser.name = call.request.name;
      existingUser.location = call.request.location;
      callback(null, existingUser);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "not_found",
      });
    }
  },
  remove: (call, callback) => {
    const userIndex = customers.findIndex(
      (customer) => customer.id === call.request.id
    );
    if (userIndex) {
      customers.splice(userIndex, 1);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "not_found",
      });
    }
  },
});

// bind the server to the port it can run on, to make it secure there is serverCredentials
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.log("error in starting the server",err)
  } else {
    server.start();
    console.log("starting the server ",port);
  }
});
