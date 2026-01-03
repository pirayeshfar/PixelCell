# PixelCell: Image to Excel Artist 🎨📊

**PixelCell** is a unique tool that transforms any image into a vibrant spreadsheet artwork. By treating each Excel cell as a pixel, it recreates your photos inside a `.xlsx` file. It also leverages **Google Gemini AI** to provide artistic insights into your creation.

## 🌟 Features
- **Pixel-Perfect Accuracy:** Extracts RGB values from images and maps them to Excel cell background fills.
- **Adjustable Resolution:** Control the level of detail (from 10 to 150 pixels wide).
- **AI-Powered Analysis:** Uses Gemini 3 Flash to generate artistic summaries of your images.
- **Smart Scaling:** Automatically preserves aspect ratios to prevent distortion in the spreadsheet.
- **Instant Download:** Generates and serves the Excel file directly in the browser.

## 🛠️ Built With
- **React + TypeScript** - Frontend framework.
- **Tailwind CSS** - Modern styling.
- **ExcelJS** - Powerful spreadsheet generation.
- **Google Gemini API** - Advanced AI image analysis.

## 🚀 Getting Started
1. Clone the repository.
2. Set up your environment variables (requires `API_KEY` for Gemini).
3. Open `index.html` in a modern browser (or serve via a local server).

## 💡 How It Works
1. **Upload:** User selects an image.
2. **Resize:** The app scales the image down to the chosen resolution.
3. **Analyze:** Gemini AI reviews the composition and provides a mood summary.
4. **Excel Generation:** The app iterates through the pixel data, converts RGB to HEX, and styles each cell in an Excel sheet.

## 👤 Credits
- **Designer & Ideator:** AmirSaman Pirayeshfar
- **Developed by:** Senior AI Engineer

---

## 🐍 Python Implementation (Standalone Script)

If you prefer to run this locally using Python, use the following code.

### Requirements
```bash
pip install Pillow openpyxl
```

### Script (`main.py`)
```python
from PIL import Image
import openpyxl
from openpyxl.styles import PatternFill

def image_to_excel(image_path, output_name, target_width=100):
    # 1. Load and resize image
    img = Image.open(image_path)
    aspect_ratio = img.height / img.width
    target_height = int(target_width * aspect_ratio)
    img = img.resize((target_width, target_height), Image.NEAREST)
    img = img.convert('RGB')

    # 2. Create Workbook
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Pixel Art"

    # 3. Process Pixels
    for y in range(target_height):
        for x in range(target_width):
            r, g, b = img.getpixel((x, y))
            hex_color = '{:02x}{:02x}{:02x}'.format(r, g, b).upper()
            
            cell = ws.cell(row=y+1, column=x+1)
            # Set background color
            cell.fill = PatternFill(start_color=hex_color, end_color=hex_color, fill_type='solid')
            
        # Optional: Set column width to make cells square
        ws.column_dimensions[openpyxl.utils.get_column_letter(x+1)].width = 2

    # 4. Save
    wb.save(output_name)
    print(f"Success! Saved to {output_name}")

if __name__ == "__main__":
    image_to_excel('path_to_your_image.jpg', 'output_art.xlsx', target_width=60)
```
