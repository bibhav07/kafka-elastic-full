import expressApp from "./expressApp";
const PORT = process.env.PORT || 3000;

export const StartServer = async () => {

  expressApp.listen(PORT, () => {
    console.log(`Catalog service is running on port ${PORT}`);
  });


  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error.message);    
    process.exit(1); // Exit the process with a failure code        

}); 

  //this is a signal handler that will be called when the process receives a SIGINT signal (Ctrl + C)
  //this is used to gracefully shutdown the server and close all connections
  process.on("SIGINT", () => {
    console.log("Catalog service is shutting down....");
    process.exit(0);
  });

}

StartServer().then( ()  => {
    console.log("Catalog service started successfully");
})