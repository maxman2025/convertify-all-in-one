import { useState, useEffect } from "react";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ExchangeRates {
  [key: string]: number;
}

const popularCurrencies = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "MXN", label: "MXN - Mexican Peso" },
];

export const CurrencyConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const { toast } = useToast();

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`);
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      toast({
        title: "Error fetching rates",
        description: "Could not fetch exchange rates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fromCurrency]);

  const convertValue = (): string => {
    if (!fromValue || isNaN(parseFloat(fromValue)) || !rates[toCurrency]) return "";
    const numValue = parseFloat(fromValue);
    const result = numValue * rates[toCurrency];
    return result.toFixed(2);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toValue = convertValue();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
            <span className="text-2xl">💱</span>
          </div>
          <h2 className="text-2xl font-bold">Currency Converter</h2>
        </div>
        <Button
          onClick={fetchRates}
          variant="outline"
          size="sm"
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {lastUpdate && (
        <p className="text-xs text-muted-foreground">
          Last updated: {lastUpdate}
        </p>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">From</label>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Enter amount"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="flex-1 text-lg h-14"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-[180px] h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {popularCurrencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
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
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-[180px] h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {popularCurrencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
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
