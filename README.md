# PixelCell: Image to Excel Artist 🎨📊

این پروژه تصاویر شما را به آثار هنری در اکسل تبدیل می‌کند. هر سلول اکسل به عنوان یک پیکسل رنگی عمل می‌کند.

## 👤 Credits
- **Designed & Conceptualized by:** AmirSaman Pirayeshfar

---

## 🚀 راهنمای ساخت نرم‌افزار اختصاصی

برای اینکه نرم‌افزار را بصورت یک فایل اجرایی در ویندوز بسازید، مراحل زیر را دنبال کنید:

### ۱. کد نهایی برنامه (`pixel_art_app.py`)
کد زیر را کپی کرده و در فایل `pixel_art_app.py` جایگزین کنید:

```python
import os
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
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
                    ws.column_dimensions[get_column_letter(x+1)].width = 2.3
            ws.row_dimensions[y+1].height = 14
            
        output_path = os.path.splitext(image_path)[0] + "_pixel_art.xlsx"
        wb.save(output_path)
        return True, output_path
    except Exception as e:
        return False, str(e)

class PixelCellApp:
    def __init__(self, root):
        self.root = root
        self.root.title("PixelCell v1.0 - By AmirSaman Pirayeshfar")
        self.root.geometry("450x400")
        self.root.configure(bg="#ffffff")
        self.root.resizable(False, False)

        # Header Area
        header_frame = tk.Frame(root, bg="#1e293b", height=80)
        header_frame.pack(fill="x", side="top")
        
        tk.Label(header_frame, text="PixelCell", font=("Segoe UI", 24, "bold"), 
                 bg="#1e293b", fg="#38bdf8").pack(pady=(10, 0))
        tk.Label(header_frame, text="Image to Spreadsheet Artist", font=("Segoe UI", 10), 
                 bg="#1e293b", fg="#94a3b8").pack(pady=(0, 10))

        # Main Content
        content = tk.Frame(root, bg="#ffffff", padx=30, pady=20)
        content.pack(fill="both", expand=True)

        tk.Label(content, text="Resolution (Target Width):", font=("Segoe UI", 10, "bold"), 
                 bg="#ffffff", fg="#475569").pack(anchor="w")
        
        self.width_entry = ttk.Entry(content, justify='center')
        self.width_entry.insert(0, "60")
        self.width_entry.pack(fill="x", pady=(5, 20))

        self.btn = tk.Button(content, text="CHOOSE IMAGE & CONVERT", command=self.process, 
                             bg="#2563eb", fg="white", font=("Segoe UI", 11, "bold"), 
                             relief="flat", height=2, cursor="hand2")
        self.btn.pack(fill="x")

        self.status = tk.Label(content, text="Ready to create artwork", font=("Segoe UI", 9, "italic"),
                               bg="#ffffff", fg="#94a3b8")
        self.status.pack(pady=10)

        # Footer Area (Copyright/Credit)
        footer = tk.Frame(root, bg="#f8fafc", height=50, bd=1, relief="sunken")
        footer.pack(fill="x", side="bottom")
        
        tk.Label(footer, text="Designed & Conceptualized by", font=("Segoe UI", 8), 
                 bg="#f8fafc", fg="#64748b").pack(pady=(5, 0))
        tk.Label(footer, text="AmirSaman Pirayeshfar", font=("Segoe UI", 10, "bold"), 
                 bg="#f8fafc", fg="#1e293b").pack(pady=(0, 5))

    def process(self):
        file_path = filedialog.askopenfilename(filetypes=[("Images", "*.jpg *.png *.jpeg *.webp")])
        if not file_path: return
        
        try:
            w = int(self.width_entry.get())
            if w > 200:
                if not messagebox.askyesno("Warning", "Higher resolution takes longer. Proceed?"): return
        except:
            messagebox.showerror("Error", "Please enter a valid number for width.")
            return

        self.status.config(text="Processing pixels... please wait", fg="#2563eb")
        self.root.update()
        
        success, msg = convert_image(file_path, w)
        if success:
            self.status.config(text="Creation Successful!", fg="#059669")
            messagebox.showinfo("Success", f"Art saved successfully at:\n{msg}")
        else:
            self.status.config(text="Error occurred", fg="#dc2626")
            messagebox.showerror("Error", f"Failed: {msg}")

if __name__ == "__main__":
    root = tk.Tk()
    # Apply a modern theme if available
    style = ttk.Style()
    if 'vista' in style.theme_names():
        style.theme_use('vista')
    
    app = PixelCellApp(root)
    root.mainloop()
```

### ۲. دستور نهایی برای ساخت EXE
فایل را ذخیره کنید و در CMD همان پوشه دستور زیر را اجرا کنید:

```bash
pyinstaller --onefile --noconsole --clean --name "PixelCell_Artist" pixel_art_app.py
```


