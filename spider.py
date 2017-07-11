"""
    This is a Scrapy spider that takes as input a JSON or JS file, with a list
    of objects containing the name and map attributes; and scrapes MindNode for
    the specified maps.
"""
from os import path, makedirs
import json
import re
import scrapy
import sys

filename = sys.argv[1]

def parse_urls(filename):
    """
        Return map IDs converted from triggers.js file and convert them to URLs
        for fetching JSON data.
    """
    with open(filename, 'r') as triggers_file:
        template = 'https://my.mindnode.com/{}.json'
        return [template.format(el['map'][0 : 40]) for el in json.load(triggers_file)]

    return None


class MindNodeSpider(scrapy.Spider):
    """
        MindNode Spider, scrapes maps from MindNode.
    """
    name = 'MindNode Spider'

    def __init__(self, filename= '', *args, **kwargs):
        super(MindNodeSpider, self).__init__(*args, **kwargs)
        self.start_urls = parse_urls(filename)

    def parse(self, response):
        data = json.loads(response.body_as_unicode())

        filename = data['title'].replace(' - ', '/').replace(' ', '-')
        filename = 'maps/{}.json'.format(filename)

        if not path.exists(path.dirname(filename)):
            makedirs(path.dirname(filename))

        with open(filename, 'w') as map_file:
            map_file.write(response.body.replace('https://my.mindnode.com', '/id'))

        yield {'id': data['token'], 'title': data['title']}