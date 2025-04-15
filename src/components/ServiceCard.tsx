
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  name: string;
  status: "up" | "down";
  uptime: string;
  lastCheck: string;
}

const ServiceCard = ({ name, status, uptime, lastCheck }: ServiceCardProps) => {
  return (
    <div className="relative bg-black/40 backdrop-blur-lg border border-neon-primary/20 rounded-lg p-4 hover:border-neon-primary/40 transition-all group">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/5 to-transparent rounded-lg" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">{name}</h3>
          <div
            className={cn(
              "flex items-center px-2 py-1 rounded",
              status === "up"
                ? "bg-success/20 text-success"
                : "bg-error/20 text-error"
            )}
          >
            {status === "up" ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <X className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">
              {status === "up" ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Uptime</span>
            <span className="text-white">{uptime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Last Check</span>
            <span className="text-white">{lastCheck}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
