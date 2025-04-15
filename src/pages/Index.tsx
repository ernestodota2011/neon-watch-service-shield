
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";

const Index = () => {
  const services = [
    {
      name: "API Server",
      status: "up" as const,
      uptime: "99.9%",
      lastCheck: "2 min ago",
    },
    {
      name: "Database",
      status: "up" as const,
      uptime: "99.7%",
      lastCheck: "1 min ago",
    },
    {
      name: "Web Server",
      status: "down" as const,
      uptime: "98.5%",
      lastCheck: "Just now",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Service Status</h1>
          <p className="text-white/60">
            Monitor your services status in real-time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
