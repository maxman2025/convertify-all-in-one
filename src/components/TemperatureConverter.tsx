import { useState } from "react";
import { ArrowDownUp, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { temperatureUnits, convertTemperature } from "@/data/conversionData";

export const TemperatureConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState(temperatureUnits[0].value);
  const [toUnit, setToUnit] = useState(temperatureUnits[1].value);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const toValue = fromValue && !isNaN(parseFloat(fromValue))
    ? convertTemperature(parseFloat(fromValue), fromUnit, toUnit).toFixed(2)
    : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <Thermometer className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold">Temperature</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">From</label>
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
                {temperatureUnits.map((unit) => (
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
          <label className="text-sm font-medium text-muted-foreground">To</label>
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
                {temperatureUnits.map((unit) => (
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
