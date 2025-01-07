"use client";

import React from "react";
import { parseColor } from "react-aria-components";

import { Button } from "@/components/ui/button";
import {
  ColorPicker,
  ColorSwatch,
  ColorArea,
  ColorSlider,
  ColorThumb,
  ColorField,
  SliderTrack,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/ColorPicker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover } from "@/components/ui/popover";
import { Input } from "@/components/custom/Textfield";

interface HexPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function HexPicker({ value, onChange }: HexPickerProps) {
  // Garante que o valor inicial seja válido
  const [color, setColor] = React.useState(parseColor(value || "#ffffff"));

  React.useEffect(() => {
    onChange(color.toString("hex"));
  }, [color, onChange]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex h-fit items-center gap-2 p-1">
          <ColorSwatch
            className="size-8 rounded-md border-2"
            style={{ backgroundColor: color.toString("hex") }} // Aplica a cor atual
          />
          Hex Color
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Popover>
          <div className="flex flex-col gap-4 p-3 outline-none">
            <div>
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                value={color}
                onChange={(newColor) => newColor && setColor(newColor)}
                className="h-[164px] rounded-b-none border-b-0"
              >
                <ColorThumb className="z-50" />
              </ColorArea>
              <ColorSlider
                colorSpace="hsb"
                channel="hue"
                value={color}
                onChange={setColor}
              >
                <SliderTrack className="rounded-t-none border-t-0">
                  <ColorThumb className="top-1/2" />
                </SliderTrack>
              </ColorSlider>
            </div>
            <ColorField
              colorSpace="hsb"
              value={color}
              onChange={(newColor) => {
                if (newColor) {
                  setColor(newColor); // Define a nova cor apenas se não for null
                }
              }}
              className="w-[192px]"
            >
              <label>Hex</label>
              <Input value={color.toString("hex")} readOnly />
            </ColorField>
            <ColorSwatchPicker className="w-[192px]">
              <ColorSwatchPickerItem color="#F00">
                <div
                  onClick={() => setColor(parseColor("#F00"))}
                  className="cursor-pointer"
                >
                  <ColorSwatch />
                </div>
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#f90">
                <div
                  onClick={() => setColor(parseColor("#f90"))}
                  className="cursor-pointer"
                >
                  <ColorSwatch />
                </div>
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#0F0">
                <div
                  onClick={() => setColor(parseColor("#0F0"))}
                  className="cursor-pointer"
                >
                  <ColorSwatch />
                </div>
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#08f">
                <div
                  onClick={() => setColor(parseColor("#08f"))}
                  className="cursor-pointer"
                >
                  <ColorSwatch />
                </div>
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#00f">
                <div
                  onClick={() => setColor(parseColor("#00f"))}
                  className="cursor-pointer"
                >
                  <ColorSwatch />
                </div>
              </ColorSwatchPickerItem>
            </ColorSwatchPicker>
          </div>
        </Popover>
      </DialogContent>
    </Dialog>
  );
}
