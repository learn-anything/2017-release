"""
    This is a Scrapy spider that takes as input a JSON or JS file, with a list
    of objects containing the name and map attributes; and scrapes MindNode for
    the specified maps.
"""
from os import path, makedirs
import json
import re
import scrapy

def parse_urls():
    """
        Return map IDs converted from triggers.js file and convert them to URLs
        for fetching JSON data.
    """
    with open('triggers.js', 'r') as triggers_file:
        data = ''.join(triggers_file.readlines())

        # Remove all that is before and after the triggers list.
        data = re.sub(r'.*\[', '[', data)
        data = re.sub(r'\].*', ']', data)

        # Convert IDs to URLs
        template = r'https://my.mindnode.com/\g<1>.json'
        data = re.sub(r'map: \'(.{40}).*\'', 'map: "{}"'.format(template), data)

        # Add quotes to attributes and convert single quotes to double quotes.
        data = re.sub(r'(name|map):', r'"\g<1>":', data)
        data = re.sub('\'', '"', data)

        # Remove trailing comma
        data = re.sub(r'},\n]', r'}\n]', data)

        return [el['map'] for el in json.loads(data)]
    return None


class MindNodeSpider(scrapy.Spider):
    """
        MindNode Spider, scrapes maps from MindNode.
    """
    name = 'MindNode Spider'
    start_urls = parse_urls()

    def parse(self, response):
        data = json.loads(response.body_as_unicode())

        filename = data['title'].replace(' ', '-').replace('_-_', '/')
        filename = 'maps/{}.json'.format(filename)

        if not path.exists(path.dirname(filename)):
            makedirs(path.dirname(filename))

        with open(filename, 'w') as map_file:
            map_file.write(response.body.replace('https://my.mindnode.com', '/id'))

        yield {'id': data['token'], 'title': data['title']}
