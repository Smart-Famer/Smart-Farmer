import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('email').click();

  await page.getByPlaceholder('email').fill('madarasemini@gmail.com');

  await page.getByPlaceholder('Password').click();

  await page.getByPlaceholder('Password').fill('Abcd@123');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/home');

  await page.getByRole('button', { name: 'Enter ' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/dashboard');

  await page.getByRole('button', { name: 'Brand' }).click();

  await page.getByRole('link', { name: ' Control Panel' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/controlPanel');

  await page.locator('.offcanvas-backdrop').click();

  await page.getByRole('button', { name: 'Take' }).click();

  await page.getByRole('button', { name: 'Brand' }).click();

  await page.getByRole('link', { name: ' Crop Yield' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/cropYield');

  await page.locator('.offcanvas-backdrop').click();

  await page.getByRole('button', { name: 'Brand' }).click();

  await page.getByRole('link', { name: ' Modules' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/Modules');

  await page.locator('.offcanvas-backdrop').click();

  await page.getByRole('button', { name: 'Brand' }).click();

  await page.getByRole('link', { name: ' Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/dashboard');

  await page.locator('.offcanvas-backdrop').click();


  await page.getByRole('button', { name: 'Brand' }).click();

  await page.getByRole('link', { name: ' Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/dashboard');

  await page.locator('.offcanvas-backdrop').click();

  await page.getByRole('link', { name: 'View Past NPK Levels>' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/historicalnpk');

  await page.getByRole('button', { name: 'Brand' }).click();

  await page.getByRole('link', { name: ' Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/dashboard');

  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/home');

  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/viewProfilePage');

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');


  await page.getByPlaceholder('email').click();
  await page.getByPlaceholder('email').fill('hirunahans@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('abcD@123');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/home');

  await page.getByRole('button', { name: 'Enter ' }).first().click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/dashboard');

  await page.getByRole('button', { name: 'Brand' }).click();
  await page.getByRole('link', { name: ' Create Account' }).click();
  await expect(page).toHaveURL(' http://localhost:3000/user/farm/createAcc');
 
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Brand' }).click();
  await page.getByRole('link', { name: ' Farm Details' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/farm/farm-details');


  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');


  await page.goto('http://localhost:3000/adminLogin');
  await page.getByPlaceholder('email').click();
  await page.getByPlaceholder('email').fill('akila@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Abcd@123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/dashboard');

  await page.getByRole('button', { name: 'View' }).first().click();
  await expect(page).toHaveURL('http://localhost:3000/admin/viewAllFarms');

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/dashboard');
  await page.getByRole('button', { name: 'View' }).nth(1).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/viewAllManagers');
  await page.getByRole('button', { name: 'Add Manager' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/createManager');
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/dashboard');
  await page.getByRole('button', { name: 'View' }).nth(2).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/viewAllAssistants');
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/dashboard');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');


});

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//   await page.getByPlaceholder('email').click();
//   await page.getByPlaceholder('email').fill('madarasemini@gmail.com');
//   await page.getByPlaceholder('Password').click();
//   await page.getByPlaceholder('Password').fill('Abcd@123');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByRole('button', { name: 'Enter ' }).click();
//   await page.getByRole('heading', { name: 'Soil Humidity' }).click();
//   await page.getByRole('button', { name: 'Brand' }).click();
//   await page.getByRole('link', { name: ' Control Panel' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: 'Brand' }).click();
//   await page.getByRole('link', { name: ' Crop Yield' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: 'Brand' }).click();
//   await page.getByRole('link', { name: ' Gallery' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: 'Brand' }).click();
//   await page.getByRole('link', { name: ' Modules' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: '' }).first().click();
//   await page.getByRole('button', { name: 'Brand' }).click();
//   await page.getByRole('link', { name: ' Modules' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: '' }).nth(1).click();
//   await page.getByRole('button', { name: 'Brand' }).click();
//   await page.getByRole('link', { name: ' Modules' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('link', { name: 'Home' }).click();
//   await page.getByRole('link', { name: 'Profile' }).click();
//   await page.getByRole('link', { name: 'Logout' }).click();
// });