import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { UnitConverter } from "@/components/UnitConverter";
import { TemperatureConverter } from "@/components/TemperatureConverter";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Ruler, Weight, Clock, Droplets } from "lucide-react";
import {
  lengthUnits,
  lengthRates,
  weightUnits,
  weightRates,
  timeUnits,
  timeRates,
  volumeUnits,
  volumeRates,
} from "@/data/conversionData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-[image:var(--gradient-primary)]">
            Convertify
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time unit & currency converter
          </p>
        </div>

        {/* Main Converter Card */}
        <Card className="p-6 md:p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] border-border/50">
          <Tabs defaultValue="currency" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 mb-8 h-auto p-1 bg-secondary/50">
              <TabsTrigger value="currency" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                💱 Currency
              </TabsTrigger>
              <TabsTrigger value="length" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                📏 Length
              </TabsTrigger>
              <TabsTrigger value="weight" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ⚖️ Weight
              </TabsTrigger>
              <TabsTrigger value="temperature" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                🌡️ Temp
              </TabsTrigger>
              <TabsTrigger value="time" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ⏱️ Time
              </TabsTrigger>
              <TabsTrigger value="volume" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                💧 Volume
              </TabsTrigger>
            </TabsList>

            <TabsContent value="currency" className="mt-6">
              <CurrencyConverter />
            </TabsContent>

            <TabsContent value="length" className="mt-6">
              <UnitConverter
                title="Length"
                icon={<Ruler className="h-6 w-6" />}
                units={lengthUnits}
                baseUnit="meter"
                conversionRates={lengthRates}
              />
            </TabsContent>

            <TabsContent value="weight" className="mt-6">
              <UnitConverter
                title="Weight"
                icon={<Weight className="h-6 w-6" />}
                units={weightUnits}
                baseUnit="kilogram"
                conversionRates={weightRates}
              />
            </TabsContent>

            <TabsContent value="temperature" className="mt-6">
              <TemperatureConverter />
            </TabsContent>

            <TabsContent value="time" className="mt-6">
              <UnitConverter
                title="Time"
                icon={<Clock className="h-6 w-6" />}
                units={timeUnits}
                baseUnit="second"
                conversionRates={timeRates}
              />
            </TabsContent>

            <TabsContent value="volume" className="mt-6">
              <UnitConverter
                title="Volume"
                icon={<Droplets className="h-6 w-6" />}
                units={volumeUnits}
                baseUnit="liter"
                conversionRates={volumeRates}
              />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Currency rates powered by Frankfurter API</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
