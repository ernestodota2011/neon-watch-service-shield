import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { useServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Obtener datos de servicios utilizando el hook personalizado
  const { data: services, isLoading, isError, error, refetch } = useServices();

  // Componente de carga
  const renderLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-black/40 border border-neon-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-36 bg-white/5" />
            <Skeleton className="h-6 w-20 bg-white/5" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 bg-white/5" />
              <Skeleton className="h-4 w-16 bg-white/5" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 bg-white/5" />
              <Skeleton className="h-4 w-20 bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Componente de error
  const renderError = () => (
    <Alert variant="destructive" className="bg-error/10 border-error/40 text-white">
      <AlertCircle className="h-4 w-4 text-error" />
      <AlertTitle>Error al cargar servicios</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : 'Ha ocurrido un error desconocido'}
      </AlertDescription>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2 border-error/30 hover:bg-error/20"
        onClick={() => refetch()}
      >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Reintentar
      </Button>
    </Alert>
  );

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
        
        {isLoading ? (
          renderLoading()
        ) : isError ? (
          renderError()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
