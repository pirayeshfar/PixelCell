# PixelCell: Image to Excel Artist 🎨📊

این پروژه تصاویر شما را به آثار هنری در اکسل تبدیل می‌کند.

## 👤 سازنده و ایده پرداز
- **امیرسامان پیرایش‌فر (AmirSaman Pirayeshfar)**

---

## 🚀 راهنمای رفع خطای "File does not exist" و ساخت EXE

خطایی که دریافت کردید به این دلیل است که فایل کد در آن پوشه پیدا نشده است. مراحل زیر را دقیقاً دنبال کنید:

### ۱. ساخت مجدد فایل کد
یک فایل Notepad باز کنید، کد زیر را در آن کپی کنید و با نام `pixel_art_app.py` (مطمئن شوید پسوند آن `.py` است و نه `.txt`) در پوشه دسکتاپ خود ذخیره کنید.

```python
import os
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image
import openpyxl
from openpyxl.utils import get_column_letter
from openpyxl.styles import PatternFill

def convert_image(image_path, width):
    try:
        img = Image.open(image_path)
        aspect_ratio = img.height / img.width
        height = int(width * aspect_ratio)
        img = img.resize((width, height), Image.Resampling.NEAREST)
        img = img.convert('RGB')
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Pixel Art"
        for y in range(height):
            for x in range(width):
                r, g, b = img.getpixel((x, y))
                hex_color = '{:02x}{:02x}{:02x}'.format(r, g, b).upper()
                cell = ws.cell(row=y+1, column=x+1)
                cell.fill = PatternFill(start_color=hex_color, end_color=hex_color, fill_type='solid')
                if y == 0:
                    ws.column_dimensions[get_column_letter(x+1)].width = 2.5
            ws.row_dimensions[y+1].height = 15
        output_path = os.path.splitext(image_path)[0] + "_excel_art.xlsx"
        wb.save(output_path)
        return True, output_path
    except Exception as e:
        return False, str(e)

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("PixelCell - Image to Excel")
        self.root.geometry("450x350")
        self.root.configure(bg="#f3f4f6")
        
        tk.Label(root, text="PixelCell Converter", font=("Arial", 18, "bold"), bg="#f3f4f6", fg="#1e40af").pack(pady=20)
        tk.Label(root, text="Enter Width (Resolution):", bg="#f3f4f6").pack()
        self.width_entry = tk.Entry(root, justify='center', font=("Arial", 12))
        self.width_entry.insert(0, "60")
        self.width_entry.pack(pady=10)
        
        self.btn = tk.Button(root, text="SELECT IMAGE & START", command=self.process, 
                             bg="#2563eb", fg="white", font=("Arial", 11, "bold"), padx=20, pady=10, cursor="hand2")
        self.btn.pack(pady=20)
        
        self.status = tk.Label(root, text="Ready to create art!", bg="#f3f4f6", fg="#6b7280")
        self.status.pack(side="bottom", pady=20)

    def process(self):
        file_path = filedialog.askopenfilename(filetypes=[("Images", "*.jpg *.png *.jpeg *.webp")])
        if not file_path: return
        try:
            w = int(self.width_entry.get())
            if w > 200: 
                if not messagebox.askyesno("Warning", "High resolution might be slow. Continue?"): return
        except:
            messagebox.showerror("Error", "Please enter a valid number.")
            return

        self.status.config(text="Processing... Please wait...", fg="#2563eb")
        self.root.update()
        success, msg = convert_image(file_path, w)
        if success:
            self.status.config(text="Success!", fg="#059669")
            messagebox.showinfo("Done", f"Excel art saved at:\n{msg}")
        else:
            messagebox.showerror("Error", f"Failed: {msg}")
            self.status.config(text="Error occurred", fg="#dc2626")

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
```

### ۲. دستور نهایی در CMD
پنجره CMD را در پوشه‌ای که فایل بالا را ذخیره کردید باز کنید و این را تایپ کنید:

```bash
pyinstaller --onefile --noconsole --clean pixel_art_app.py
```

**نکته حیاتی:** 
اگر باز هم پیام "file does not exist" داد، در CMD تایپ کنید `dir` و مطمئن شوید فایلی با پسوند `.py` در لیست هست. اگر فایل شما به صورت `pixel_art_app.py.txt` ذخیره شده باشد، کار نمی‌کند. در این صورت آن را به `pixel_art_app.py` تغییر نام (Rename) دهید.

### ۳. محل فایل خروجی
بعد از اتمام عملیات، پوشه‌ای به نام **dist** ساخته می‌شود. فایل `.exe` شما داخل آن است. آن را کپی کنید و هرجا خواستید استفاده کنید. دیگر نه ترمینالی باز می‌شود و نه برنامه خودکار بسته می‌شود.
