import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.color import Color

from tests.values import strings


class ShowResultsScreen:
    def __init__(self, driver):
        self.driver = driver
        self.search_results = driver.find_elements_by_css_selector('div.row>div.col.s12')
        self.back_button = driver.find_element_by_partial_link_text('BACK')

    def get_result(self, number):
        index = number - 1
        return self.search_results[index]

    def go_external_url_by_index(self, number):
        external_url = self.get_result(number).find_element_by_link_text('URL')
        url = external_url.get_attribute('href')
        external_url.click()

        assert self.driver.current_url == url

    def press_back_button(self):
        self.driver.find_element_by_partial_link_text('BACK').click()

        assert self.driver.current_url == strings.search_url

    def change_background_color_by_result_title(self, title, color):
        wait = WebDriverWait(self.driver, 3)
        card = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//span[text()='" + title + "']//ancestor::div[contains(@class,'card')]")))

        self.driver.execute_script(
            "arguments[0].setAttribute('style', 'background-color: " + color + " !important')",
            card)

        color_after = Color.from_string(card.value_of_css_property('background-color'))

        assert color_after.hex == color
