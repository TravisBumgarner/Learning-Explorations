/*******************************************************************************
 * Copyright (C) 2015 Josef Cacek
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package com.github.kwart.jd.parser;

/**
 * Exception class used to report problems during class file parsing.
 *
 * @author Josef Cacek
 */
public class ClassFormatException extends Exception {

    private static final long serialVersionUID = 1L;

    public ClassFormatException() {
    }

    public ClassFormatException(String message) {
        super(message);
    }

    public ClassFormatException(Throwable cause) {
        super(cause);
    }

    public ClassFormatException(String message, Throwable cause) {
        super(message, cause);
    }

}
