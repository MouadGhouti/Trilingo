## Notes for Collaboration  

This guide explains how to work together on this project using Git. Follow these steps to keep things simple and organized.  

### 1. **First-Time Setup (Day One)**  

If it’s your first time working on the project, start by downloading the repository to your computer:  

```bash  
git clone https://github.com/MouadGhouti/Trilingo.git  
```  

This will create a local copy of the project on your computer.  

---

## Continuous Development (After Day One)  

After the first day, follow these steps whenever you want to make updates to the project:  

### 1. **Go to the Project Folder**  

Open your terminal and move to the folder where you saved the project:  

```bash  
cd path/to/your/local/repo  
```  

### 2. **Get the Latest Updates**  

Before making any changes, make sure you have the latest version of the project:  

```bash  
git pull origin main  
```  

This downloads any new changes that others might have made.  

### 3. **Make Your Changes**  

Edit the files as needed on your computer.  

### 4. **Save and Upload Your Changes**  

When you’re done, save your work to the project. Run these commands one by one:  

1. **Prepare your changes:**  
   ```bash  
   git add .  
   ```  

2. **Save your changes with a message:**  
   ```bash  
   git commit -m "Write a short description of your changes"  
   ```  

3. **Send your changes to the main project:**  
   ```bash  
   git push origin main  
   ```  

### 5. **Repeat When Needed**  

For every new update:  
1. Get the latest updates (`git pull`).  
2. Make your changes.  
3. Save and upload your work (`git add`, `git commit`, `git push`).  
