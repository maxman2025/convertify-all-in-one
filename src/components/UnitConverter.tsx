import { useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UnitOption {
  value: string;
  label: string;
}

interface ConversionRates {
  [key: string]: number;
}

interface UnitConverterProps {
  title: string;
  icon: React.ReactNode;
  units: UnitOption[];
  baseUnit: string;
  conversionRates: ConversionRates;
}

export const UnitConverter = ({ title, icon, units, baseUnit, conversionRates }: UnitConverterProps) => {
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState(units[0].value);
  const [toUnit, setToUnit] = useState(units[1].value);

  const convertValue = (value: string, from: string, to: string): string => {
    if (!value || isNaN(parseFloat(value))) return "";
    
    const numValue = parseFloat(value);
    // Convert to base unit first, then to target unit
    const inBaseUnit = numValue * conversionRates[from];
    const result = inBaseUnit / conversionRates[to];
    
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const toValue = convertValue(fromValue, fromUnit, toUnit);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          {icon}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">To</label>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Enter value"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="flex-1 text-lg h-14"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="w-[160px] h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSwap}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
          >
            <ArrowDownUp className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">From</label>
          <div className="flex gap-3">
            <Input
              type="number"
              value={toValue}
              readOnly
              placeholder="Result"
              className="flex-1 text-lg h-14 bg-secondary"
            />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-[160px] h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
