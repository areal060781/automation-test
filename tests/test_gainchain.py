import pytest

from .helpers.testdata import *
from .screens.showsearch import ShowSearch as SearchScreen
from .screens.showresults import ShowResults as ResultsScreen


@pytest.fixture
def chrome_options(chrome_options):
    chrome_options.add_argument('headless')
    return chrome_options


@pytest.fixture
def firefox_options(firefox_options):
    firefox_options.headless = True
    return firefox_options


@pytest.fixture
def selenium(selenium):
    selenium.implicitly_wait(3)
    selenium.maximize_window()
    return selenium


def test_search(selenium):
    selenium.get(search_url)

    search = SearchScreen(selenium)
    search.run(show_name)

    results = ResultsScreen(selenium)
    results.go_external_url_by_index(result_index)

    selenium.back()

    results.change_background_color_by_result_title(show_title, color)
    results.press_back_button()

    search.validate_input_search_is_empty()
